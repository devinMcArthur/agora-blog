import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import jestLogin from "@testing/jestLogin";
import { NewPageData } from "@graphql/resolvers/page/mutations";
import { StyleTypes } from "@typescript/models/Statement";
import path from "path";
import { Page } from "@models";
import { MimeTypeEnum } from "@typescript/models/File";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

let mongoServer: any, documents: SeededDatabase, app: any;
function setupDatabase() {
  return new Promise<void>(async (resolve, reject) => {
    try {
      documents = await seedDatabase();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

beforeAll(async (done) => {
  mongoServer = await prepareDatabase();

  app = await createApp();

  await setupDatabase();

  done();
});

afterAll(async (done) => {
  await disconnectAndStopServer(mongoServer);
  done();
});

describe("Page Resolver", () => {
  describe("MUTATIONS", () => {
    describe("newPage", () => {
      const newPage = `
        mutation NewPage($data: NewPageData!) {
          newPage(data: $data) {
            _id
            title
            paragraphs {
              _id
            }
            currentParagraph {
              _id
              statements {
                versionIndex
                statement {
                  versions {
                    stringArray {
                      styles {
                        value {
                          image {
                            caption
                            sourceUrl
                            file {
                              buffer
                              mimetype
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully create a new page w/ an image statement", async () => {
          const token = await jestLogin(app, documents.users.dev.email);

          const data: NewPageData = {
            title: "New Page",
            paragraph: {
              statements: [
                {
                  newQuestions: ["New Question"],
                  questions: [
                    documents.questions.are_masks_effective_against_covid_19._id.toString(),
                  ],
                  stringArray: [
                    {
                      string: "here is the image:",
                      styles: [],
                    },
                    {
                      styles: [
                        {
                          type: StyleTypes.image,
                          value: {
                            image: {
                              caption: "An image",
                              sourceUrl: "www.google.ca",
                              // @ts-expect-error
                              file: null,
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          };

          const filename = "viral-culture-per-ct-value.jpg";
          const res = await request(app)
            .post("/graphql")
            .field(
              "operations",
              JSON.stringify({
                query: newPage,
                variables: {
                  data,
                },
              })
            )
            .field(
              "map",
              /**
               * @doc https://github.com/jaydenseric/graphql-multipart-request-spec
               */
              JSON.stringify({
                1: [
                  "variables.data.paragraph.statements.0.stringArray.1.styles.0.value.image.file",
                ],
              })
            )
            .attach(
              "1",
              path.resolve(__dirname, `../../testing/assets/${filename}`)
            )
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.newPage).toBeDefined();
          expect(res.body.data.newPage.title).toBe(data.title);
          expect(res.body.data.newPage.paragraphs.length).toBe(1);
          expect(res.body.data.newPage.currentParagraph._id).toBe(
            res.body.data.newPage.paragraphs[0]._id
          );

          const page = await Page.getById(res.body.data.newPage._id);
          expect(page).toBeDefined();

          const currentParagraph = res.body.data.newPage.currentParagraph;
          expect(currentParagraph.statements[0].versionIndex).toBe(0);

          const imageStringArray =
            currentParagraph.statements[0].statement.versions[
              currentParagraph.statements[0].versionIndex
            ].stringArray[1];

          expect(imageStringArray.styles[0].value.image.caption).toBe(
            data.paragraph.statements[0].stringArray[1].styles[0].value?.image
              ?.caption
          );
          expect(imageStringArray.styles[0].value.image.sourceUrl).toBe(
            data.paragraph.statements[0].stringArray[1].styles[0].value?.image
              ?.sourceUrl
          );

          expect(
            imageStringArray.styles[0].value.image.file.buffer
          ).toBeDefined();
          expect(imageStringArray.styles[0].value.image.file.mimetype).toBe(
            MimeTypeEnum.JPEG
          );
        });
      });
    });
  });

  describe("QUERIES", () => {
    describe("page", () => {
      const pageQuery = `
        query PageQuery($id: ID, $slug: String) {
          page(id: $id, slug: $slug) {
            currentParagraph {
              statements {
                versionIndex
                statement {
                  current
                }
              }
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully fetch page, its paragraph, and the paragraphs statements", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: pageQuery,
              variables: {
                id: documents.pages.page_covid_19_deaths._id,
              },
            });

          expect(res.status).toBe(200);

          expect(
            res.body.data.page.currentParagraph.statements[0].versionIndex
          ).toBe(0);
          expect(
            res.body.data.page.currentParagraph.statements[0].statement.current
          ).toBeTruthy();
        });
      });
    });

    describe("searchPages", () => {
      const searchPagesQuery = `
        query SearchPages($searchString: String!) {
          searchPages(searchString: $searchString) {
            title
          }
        }
      `;

      describe("success", () => {
        test.skip("should successfully search pages", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: searchPagesQuery,
              variables: {
                searchString: "mask",
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.searchPages[0].title).toBe(
            documents.pages.page_covid_19_masks.title
          );
        });
      });
    });
  });
});
