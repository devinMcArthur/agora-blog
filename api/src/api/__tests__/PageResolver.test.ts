import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";

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
        test("should successfully search pages", async () => {
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
