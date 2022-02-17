package com.omp.matchroom.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping("/")
	public String Home(Principal principal, Model model, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (principal != null) {
			System.out.println(principal.getName());
			System.out.println(principal.toString());
			return "redirect:/user/roomList"; // 로그인정보가 있을 경우
		}

		return "login/login"; // 로그인 페이지
	}

}
