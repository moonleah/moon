package com.omp.matchroom.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.omp.matchroom.dao.StoreDAO;
import com.omp.matchroom.service.StoreService;
import com.omp.matchroom.vo.RestResultVO;
import com.omp.matchroom.vo.StoreVO;

@Service
public class StoreServiceImpl implements StoreService {
	@Autowired
	StoreDAO dao;

	@Override
	public List<RestResultVO> getStoreList(RestResultVO vo) throws Exception {
		return dao.getStoreList(vo);
	}

	@Override
	public List<StoreVO> addStoreFromExcelFile(StoreVO storeVO) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int storeInsert(RestResultVO vo) throws Exception {
		// TODO Auto-generated method stub
		return dao.storeInsert(vo);
	}

	@Override
	public StoreVO getStoreDetail(String storeId) throws Exception {
		return dao.getStoreDetail(storeId);
	}

}
