package com.omp.matchroom.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	@RequestMapping("/index")
	public String index(Principal principal, Model model, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		return "web/index";
	}

	@RequestMapping("/property-list")
	public String list(Principal principal, Model model, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		return "web/property-list";
	}

	@RequestMapping("/property-type")
	public String type(Principal principal, Model model, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		return "web/property-type";
	}

	@RequestMapping("/property-agent")
	public String agent(Principal principal, Model model, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		return "web/property-agent";
	}

	@RequestMapping("/testimonial")
	public String testimonial(Principal principal, Model model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return "web/testimonial";
	}


}
