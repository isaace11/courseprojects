import type { Request, Response } from 'express';
import { books } from '../data/books.js';
import { Book } from '../models/Book.js';

export class HomeController {
  static index(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};

    viewData['title'] = 'Home';

    res.render('home/index', {
      viewData
    });
  }

  static about(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};

    viewData['title'] = 'About';

    res.render('home/about', {
      viewData
    });
  }

  static contact(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};

    viewData['title'] = 'Contact';

    res.render('home/contact', {
      viewData
    });
  }

  static mainPoint(req: Request, res: Response): void {
    const viewData = {
      title: 'Books',
      books
    };

    res.render('home/books', {
      viewData,
      books
    });
  }

  static show(req: Request, res: Response): void {
  const idParam = req.params.id;

  if (!idParam || Array.isArray(idParam)) {
    res.status(400).send('Book id is invalid');
    return;
  }

  const id = Number.parseInt(idParam, 10);

  if (Number.isNaN(id)) {
    res.status(400).send('Book id must be a number');
    return;
  }

  const book = Book.findById(books, id);

  const viewData = {
    title: book.title
  };

  res.render('home/show', {
    viewData,
    book
  });
}

  
}