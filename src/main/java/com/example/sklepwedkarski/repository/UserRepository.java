package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
