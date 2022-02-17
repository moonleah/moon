package com.omp.matchroom.vo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@ToString
@Getter
@Setter
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
