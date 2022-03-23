package com.omp.matchroom.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.omp.matchroom.vo.RoomVO;

@Mapper
public interface UploadMapper {

	public void insertRoom(RoomVO roomVO) throws Exception;

}
