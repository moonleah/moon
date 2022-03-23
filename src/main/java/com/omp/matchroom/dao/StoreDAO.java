package com.omp.matchroom.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.omp.matchroom.mapper.StoreMapper;
import com.omp.matchroom.vo.RestResultVO;
import com.omp.matchroom.vo.StoreVO;

@Component
public class StoreDAO {

	@Autowired
	private StoreMapper mapper;

	public List<RestResultVO> getStoreList(RestResultVO vo) throws Exception {
		return mapper.getStoreList(vo);
	}

	public int storeInsert(RestResultVO vo) throws Exception {
		// TODO Auto-generated method stub
		return mapper.storeInsert(vo);
	}

	public StoreVO getStoreDetail(String storeId) throws Exception {
		return mapper.getStoreDetail(storeId);
	}

}
