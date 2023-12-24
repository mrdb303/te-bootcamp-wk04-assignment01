import Database from "better-sqlite3";
const db = new Database("database.db");


db.exec(`
  CREATE TABLE IF NOT EXISTS guestbook (
    username TEXT,
    message TEXT,
    visit TEXT,
    likes INTEGER
  )
`);


db.exec(`
    INSERT INTO guestbook (username, message, visit, likes)
    VALUES
    ('The Chuckle Brothers','To me to you.', '2023-12-15T14:14:02.839Z', 22),
    ('Billy Table', 'Do not drop me.', '2023-12-18T19:14:02.839Z', 17),
    ('Cilla Black', 'Surprise suprise!.', '2023-12-21T19:10:08.839Z', 2),
    ('Bill Oddie', 'This is a much longer message that should stretch to multiple rows or I will eat my wool-based headwear.', '2023-12-21T19:11:02.839Z', 19),
    ('Ronnie Pickering', 'Do you know who I am?.', '2023-12-21T19:14:02.839Z', 10),
    ('Baz Manilow', 'The page will not refresh here, even though it did on the local server. Grrr....', '2023-12-24T19:15:07.839Z', 10)
`);