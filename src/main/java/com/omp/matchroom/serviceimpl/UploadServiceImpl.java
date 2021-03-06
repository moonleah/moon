package com.omp.matchroom.serviceimpl;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.omp.matchroom.dao.UploadDAO;
import com.omp.matchroom.service.UploadService;
import com.omp.matchroom.vo.RoomVO;

@Service
public class UploadServiceImpl implements UploadService {
	@Autowired
	UploadDAO dao;

	@Override
	public void insertRoom(RoomVO roomVO, MultipartHttpServletRequest multipartHttpServletRequest) throws Exception {
		System.out.println("RoomVO : " + roomVO);

		dao.insertRoom(roomVO);
		String path = "C:\\image\\";

		if (ObjectUtils.isEmpty(multipartHttpServletRequest) == false) {
			Iterator<String> filenameIterator = multipartHttpServletRequest.getFileNames();
			String name;
			while (filenameIterator.hasNext()) {
				name = filenameIterator.next();

				System.out.println("File name tag : " + name);
				List<MultipartFile> fileList = multipartHttpServletRequest.getFiles(name);
				for (MultipartFile multipartFile : fileList) {

					// 파일을 폴더에 저장
					String safeFile = path + System.currentTimeMillis() + multipartFile.getOriginalFilename();
					System.out.println("safeFile : " + safeFile);
					try {
						multipartFile.transferTo(new File(safeFile));
					} catch (IllegalStateException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

				}

				System.out.println("fileList : " + fileList);

			}
		}

	}

}
