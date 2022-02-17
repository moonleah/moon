package com.omp.matchroom.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.omp.matchroom.service.StoreService;
import com.omp.matchroom.vo.RestResultVO;

@Controller
public class StoreController { //

	@Autowired
	private StoreService service;

	@RequestMapping("/user/roomList")
	public String roomlist(@ModelAttribute RestResultVO vo, Model model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return "/room/room_content";
	}

	@RequestMapping(value = "/user/getStoreList")
	@ResponseBody
	public List<RestResultVO> List(@ModelAttribute RestResultVO vo, Model model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		System.out.println(vo);
		List<RestResultVO> list = service.getStoreList(vo);
		return list;

	}

	@RequestMapping("/user/roominsert")
	public String roominsert(@ModelAttribute RestResultVO vo, Model model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return "/room/store_insert";
	}

	@RequestMapping(value = "/user/storeInsert")
	public String addStoreExcelFile(@Validated RestResultVO vo, Model model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		int result = service.storeInsert(vo);

		System.out.println(vo.getStoreList());
		return "redirect:/user/roomList";
	}

}
