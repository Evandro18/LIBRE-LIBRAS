package br.edu.ifms.aquidauana.pibic.model;

public class Mao {

	private Dedo minimo;

	private Dedo anelar;

	private Dedo medio;

	private Dedo indicador;

	private Dedo polegar;

	private Float rotacaoLateral;

	private Float rotacaoVertical;

	private Float rotacaoLongitudinal;

	private Boolean esquerda;

	private Boolean direita;

	public Boolean isEsquerda() {
		return esquerda;
	}

	public void setEsquerda(Boolean esquerda) {
		this.esquerda = esquerda;
	}

	public Boolean isDireita() {
		return direita;
	}

	public void setDireita(Boolean direita) {
		this.direita = direita;
	}

	public Dedo getMinimo() {
		return minimo;
	}

	public void setMinimo(Dedo minimo) {
		this.minimo = minimo;
	}

	public Dedo getAnelar() {
		return anelar;
	}

	public void setAnelar(Dedo anelar) {
		this.anelar = anelar;
	}

	public Dedo getMedio() {
		return medio;
	}

	public void setMedio(Dedo medio) {
		this.medio = medio;
	}

	public Dedo getIndicador() {
		return indicador;
	}

	public void setIndicador(Dedo indicador) {
		this.indicador = indicador;
	}

	public Dedo getPolegar() {
		return polegar;
	}

	public void setPolegar(Dedo polegar) {
		this.polegar = polegar;
	}

	public Float getRotacaoLateral() {
		return rotacaoLateral;
	}

	public void setRotacaoLateral(Float rotacaoLateral) {
		this.rotacaoLateral = rotacaoLateral;
	}

	public Float getRotacaoVertical() {
		return rotacaoVertical;
	}

	public void setRotacaoVertical(Float rotacaoVertical) {
		this.rotacaoVertical = rotacaoVertical;
	}

	public Float getRotacaoLongitudinal() {
		return rotacaoLongitudinal;
	}

	public void setRotacaoLongitudinal(Float rotacaoLongitudinal) {
		this.rotacaoLongitudinal = rotacaoLongitudinal;
	}

	@Override
	public String toString() {
		String str = "Mão ";
		str += this.isDireita() ? "direita" : "esquerda";
		str += "\nDedo mínimo: ";
		str += " Distância distal-palma: " + this.getMinimo().getDistanciaDistal();
		str += " Distância lateral esquerda: " + this.getMinimo().getDistanciaLateralEsquerda();
		
		str += "\nDedo anelar: ";
		str += " Distância distal-palma: " + this.getAnelar().getDistanciaDistal();
		str += " Distância lateral esquerda: " + this.getAnelar().getDistanciaLateralEsquerda();
		
		str += "\nDedo médio: ";
		str += " Distância distal-palma: " + this.getMedio().getDistanciaDistal();
		str += " Distância lateral esquerda: " + this.getMedio().getDistanciaLateralEsquerda();
		
		str += "\nDedo indicador: ";
		str += " Distância distal-palma: " + this.getIndicador().getDistanciaDistal();
		
		str += "\nDedo polegar: ";
		str += " Distância distal-palma: " + this.getPolegar().getDistanciaDistal();
		
		str += "\nRotação lateral: " + this.getRotacaoLateral();
		str += "\nRotação longitudinal: " + this.getRotacaoLongitudinal();
		str += "\nRotação vertical: " + this.getRotacaoVertical();
		return str;
	}
}
