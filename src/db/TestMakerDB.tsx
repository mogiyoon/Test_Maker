import Realm from 'realm';

// TestDB는 기능이 자주 변경되지 않지만 많은 데이터를 사용할 예정이므로 realm 사용

const MyTestSchema = {
  name: 'MyTest',
  properties: {
    id: 'string',
    category: 'string',
    word: 'string',
    meaning: 'string',
  },
};

const IncorrectAnswerSchema = {
  name: 'IncorrectAnswer',
  properties: {
    id: 'string',
    category: 'string',
    word: 'string',
    meaning: 'string',
    incorrectNumber: 'int',
  },
};

export const testMakerRealm = new Realm({
  schema: [MyTestSchema, IncorrectAnswerSchema],
  schemaVersion: 1,
});
