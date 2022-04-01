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
public class RoomVO {

	private String storeId;
	private String storeName;
	private String roomName;
	private String roomCapacity;
	private String useFlag;

}
