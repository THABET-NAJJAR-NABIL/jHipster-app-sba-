package com.app.sba.repository;

import com.app.sba.domain.Book;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Book entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookRepository extends JpaRepository<Book, Long>, JpaSpecificationExecutor<Book> {

    @Query("select book from Book book where book.user.login = ?#{principal.username}")
    List<Book> findByUserIsCurrentUser();
}
