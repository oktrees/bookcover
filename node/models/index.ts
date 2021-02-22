import User, {associate as associateUser } from './user';
import Book, {associate as associateBook } from './book';

export * from './sequelize';
const db = {
  User,
  Book
};
export type dbType = typeof db;

associateUser(db);
associateBook(db);