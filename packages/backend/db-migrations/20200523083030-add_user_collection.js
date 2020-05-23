module.exports = {
  async up(db) {
    await db
      .collection('users')
      .createIndex(
        { pseudo: 1 },
        { background: true, unique: true, name: 'pseudo' },
      );
  },

  async down(db) {
    await db.dropCollection('users');
  },
};
