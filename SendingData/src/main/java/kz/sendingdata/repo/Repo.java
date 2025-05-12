package kz.sendingdata.repo;

import kz.sendingdata.model.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Repo extends JpaRepository<Emoji, Integer> {

}
