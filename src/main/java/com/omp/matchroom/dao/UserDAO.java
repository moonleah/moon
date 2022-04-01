package com.omp.matchroom.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.omp.matchroom.mapper.UserMapper;
import com.omp.matchroom.vo.UserVO;

@Component
public class UserDAO {

	@Autowired
	private UserMapper mapper;

	public UserVO getUser(UserVO userVO) throws Exception {
		return mapper.getUser(userVO);
	}

	public UserVO getUserId(String username) throws Exception {
		return mapper.getUserId(username);
	}

	public void insertUser(UserVO userVO) throws Exception {
		mapper.insertUser(userVO);
	}

}
