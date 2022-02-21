package com.omp.matchroom.vo;

import org.mybatis.spring.annotation.MapperScan;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@ToString
@Getter
@Setter
@MapperScan
public class StoreVO {

	private String storeId;
	private String storeTypeName;
	private String pmsNum;
	private String storeName;
	private String ownerName;
	private String storeAddressRoad;
	private String storeAddress;
	private String storeArea;
	private String postalCode;

}
