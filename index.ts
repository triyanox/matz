import matz from "lib";

const t = await matz.Transpiler.fromFile("./sample.matz");
await t.saveToFile("./");
