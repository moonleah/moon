package com.omp.matchroom.service;

import java.util.List;

import com.omp.matchroom.vo.RestResultVO;
import com.omp.matchroom.vo.StoreVO;

public interface StoreService {

	List<RestResultVO> getStoreList(RestResultVO vo) throws Exception;

	List<StoreVO> addStoreFromExcelFile(StoreVO storeVO) throws Exception;

	int storeInsert(RestResultVO vo) throws Exception;

}
