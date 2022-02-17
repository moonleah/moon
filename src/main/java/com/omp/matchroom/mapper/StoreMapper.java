package com.omp.matchroom.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.omp.matchroom.vo.RestResultVO;

@Mapper
public interface StoreMapper {

	public List<RestResultVO> getStoreList(RestResultVO vo) throws Exception;

	public int storeInsert(RestResultVO vo) throws Exception;

}
