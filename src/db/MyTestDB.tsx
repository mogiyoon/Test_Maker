import Realm from "realm";

const MyTestSchema = {
  name: 'MyTest',
  properties: {
    id: 'string',
    category: 'string',
    word: 'string',
    meaning: 'string',
  }
};

export const testRealm = new Realm({
  schema: [MyTestSchema],
  schemaVersion: 1,
}
);
