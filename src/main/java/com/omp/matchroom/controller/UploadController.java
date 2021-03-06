package com.omp.matchroom.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.omp.matchroom.service.UploadService;
import com.omp.matchroom.vo.RoomVO;

@Controller
public class UploadController { //

	@Autowired
	private UploadService service;

	@RequestMapping("/user/upRoomInfo")
	public String insertBoard(Principal principal, RoomVO roomVO,
			MultipartHttpServletRequest multipartHttpServletRequest) throws Exception {

		roomVO.setUserEmail(principal.getName().toString());

		service.insertRoom(roomVO, multipartHttpServletRequest);

		return "redirect:/user/roomList";
	}

}
