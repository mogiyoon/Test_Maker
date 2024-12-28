import Realm from "realm";

// TestDB는 기능이 자주 변경되지 않지만 많은 데이터를 사용할 예정이므로 realm 사용

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
});

