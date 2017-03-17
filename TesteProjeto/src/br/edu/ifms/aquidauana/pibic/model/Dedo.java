package br.edu.ifms.aquidauana.pibic.model;

import com.leapmotion.leap.Bone;

public class Dedo {

	private Float distanciaDistal;

	private double distanciaLateralEsquerda;

	private Bone ossoDistal;

	public Bone getOssoDistal() {
		return ossoDistal;
	}

	public void setOssoDistal(Bone ossoDistal) {
		this.ossoDistal = ossoDistal;
	}

	public double getDistanciaLateralEsquerda() {
		return distanciaLateralEsquerda;
	}

	public void setDistanciaLateralEsquerda(double distanciaLateralEsquerda) {
		this.distanciaLateralEsquerda = distanciaLateralEsquerda;
	}

	public Float getDistanciaDistal() {
		return distanciaDistal;
	}

	public void setDistanciaDistal(Float distanciaDistal) {
		this.distanciaDistal = distanciaDistal;
	}


}
