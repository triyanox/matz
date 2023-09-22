import matz from "lib";

const t = await matz.Transpiler.fromFile("./examples/sample.matz");
console.log(await t.saveToFile("./"));
console.log(await t.run());
