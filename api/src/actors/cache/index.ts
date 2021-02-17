import { dispatch, spawnStateless } from "nact";
import { spawn_pages_service } from "./page";
import { spawn_paragraphs_service } from "./paragraph";
import { spawn_questions_service } from "./question";
import { spawn_statements_service } from "./statement";
import { spawn_page_slug_service } from "./page_slug";
import { spawn_page_list_service } from "./page_list";
import { spawn_variables_service } from "./variable";
import { spawn_question_list_service } from "./question_list";
import { spawn_topics_service } from "./topic";

const spawn_cache_service = (system: any) =>
  spawnStateless(
    system,
    (msg, ctx) => {
      const path = msg.path;

      let childActor: any;
      if (ctx.children.get(path[0])) {
        childActor = ctx.children.get(path[0]);
      } else if (path[0] === "pages") {
        childActor = spawn_pages_service(ctx.self);
      } else if (path[0] === "page_slugs") {
        childActor = spawn_page_slug_service(ctx.self);
      } else if (path[0] === "page_list") {
        childActor = spawn_page_list_service(ctx.self);
      } else if (path[0] === "paragraphs") {
        childActor = spawn_paragraphs_service(ctx.self);
      } else if (path[0] === "statements") {
        childActor = spawn_statements_service(ctx.self);
      } else if (path[0] === "questions") {
        childActor = spawn_questions_service(ctx.self);
      } else if (path[0] === "question_list") {
        childActor = spawn_question_list_service(ctx.self);
      } else if (path[0] === "variables") {
        childActor = spawn_variables_service(ctx.self);
      } else if (path[0] === "topics") {
        childActor = spawn_topics_service(ctx.self);
      }

      if (childActor) dispatch(childActor, { sender: ctx.self, ...msg });
    },
    "cache"
  );

export { spawn_cache_service };
