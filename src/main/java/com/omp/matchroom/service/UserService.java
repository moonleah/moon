package com.omp.matchroom.service;

import com.omp.matchroom.vo.UserVO;

public interface UserService {
	public UserVO getUser(UserVO userVO) throws Exception;

	public void insertUser(UserVO userVO) throws Exception;

	
}
