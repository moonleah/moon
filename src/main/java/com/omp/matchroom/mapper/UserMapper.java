package com.omp.matchroom.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;

import com.omp.matchroom.vo.UserVO;


@Mapper
public interface UserMapper {
	
	public UserVO getUser(UserVO userVO) throws Exception;

	public void insertUser(UserVO userVO) throws Exception;

	public UserVO getUserId(String username) throws Exception;

	
}
