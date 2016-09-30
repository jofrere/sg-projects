package com.cobalt.sample.service;

import com.cobalt.sample.domain.Book;

public interface BookRepository {

    Book getByIsbn(String isbn);

}