package com.omp.matchroom.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.omp.matchroom.mapper.UploadMapper;
import com.omp.matchroom.vo.RoomVO;

@Component
public class UploadDAO {

	@Autowired
	private UploadMapper mapper;

	public void insertRoom(RoomVO roomVO) throws Exception {
		mapper.insertRoom(roomVO);
	}

}
