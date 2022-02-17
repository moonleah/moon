package com.omp.matchroom.config.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
//시큐리티 설정 ("/login")

import com.omp.matchroom.dao.UserDAO;
import com.omp.matchroom.vo.UserVO;



@Service
public class PrincipalDetailsService implements UserDetailsService {
	
	@Autowired
	private UserDAO dao ;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		    UserVO user;
			System.out.println(username + " : username");
			try {
				user = dao.getUserId(username);
				if(user != null) {
					return new PrincipalDetails(user);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return null;
	}
}
