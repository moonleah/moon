package com.omp.matchroom.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.omp.matchroom.vo.RoomVO;

public interface UploadService {

	void insertBoard(RoomVO roomVO, MultipartHttpServletRequest multipartHttpServletRequest) throws Exception;

}
