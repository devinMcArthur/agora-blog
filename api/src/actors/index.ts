import { configurePersistence, start } from "nact";
import { PostgresPersistenceEngine } from "nact-persistence-postgres";

const system = start(
  configurePersistence(
    new PostgresPersistenceEngine(
      `${process.env.PG_HOST}:${process.env.PG_PORT}`
    )
  )
);

export default system;
