package kz.ers.repo;

import kz.ers.model.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmojiRepo extends JpaRepository<Emoji, Integer> {

    @Query("select emoji from Emoji emoji where (emoji.name ilike concat('%', :s, '%') or emoji.category ilike concat('%', :s, '%') or emoji.groups ilike concat('%', :s, '%')) and emoji.name not ilike '%type%' or (emoji.name ilike concat('%', :s, '%') or emoji.category ilike concat('%', :s, '%') or emoji.groups ilike concat('%', :s, '%')) and emoji.name ilike concat('%',:skin) ")
    List<Emoji> search(@Param("s") String search, @Param("skin") String skinFilter);

    @Query("select emoji from Emoji emoji where (emoji.name ilike concat('%', :s, '%') or emoji.category ilike concat('%', :s, '%') or emoji.groups ilike concat('%', :s, '%')) and emoji.name not ilike '%type%'")
    List<Emoji> searchForCommon(@Param("s") String search);

    @Query("select emoji from Emoji emoji where (emoji.name ilike concat('%', :s, '%') or emoji.category ilike concat('%', :s, '%') or emoji.groups ilike concat('%', :s, '%'))")
    List<Emoji> searchWithoutSkinFilter(@Param("s") String search);

}