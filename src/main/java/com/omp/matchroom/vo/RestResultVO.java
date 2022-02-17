package com.omp.matchroom.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@ToString
@Getter
@Setter
public class RestResultVO {

	private String storeId;
	private String storeTypeName;
	private String pmsNum;
	private String storeName;
	private String ownerName;
	private String storeAddressRoad;
	private String storeAddress;
	private String storeArea;
	private String postalCode;

	private String roomId;
	private String rStoreName;
	private String roomName;
	private String roomCapacity;
	private String roomStatus;
	private String useflag;

	private String updateDate;
	private String rUpdateDate;

	private String searchStoreName;
	private String searchStoreAddress;
	private String searchCapacity;

	private List<StoreVO> storeList;

	@JsonIgnore
	private List<MultipartFile> addExcelFile;
}