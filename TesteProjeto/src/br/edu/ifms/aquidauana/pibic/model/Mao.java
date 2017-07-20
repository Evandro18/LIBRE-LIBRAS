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
		String str = "M�o ";
		str += this.isDireita() ? "direita" : "esquerda";
		str += "\nDedo m�nimo: ";
		str += " Dist�ncia distal-palma: " + this.getMinimo().getDistanciaDistal();
		str += " Dist�ncia lateral esquerda: " + this.getMinimo().getDistanciaLateralEsquerda();
		
		str += "\nDedo anelar: ";
		str += " Dist�ncia distal-palma: " + this.getAnelar().getDistanciaDistal();
		str += " Dist�ncia lateral esquerda: " + this.getAnelar().getDistanciaLateralEsquerda();
		
		str += "\nDedo m�dio: ";
		str += " Dist�ncia distal-palma: " + this.getMedio().getDistanciaDistal();
		str += " Dist�ncia lateral esquerda: " + this.getMedio().getDistanciaLateralEsquerda();
		
		str += "\nDedo indicador: ";
		str += " Dist�ncia distal-palma: " + this.getIndicador().getDistanciaDistal();
		
		str += "\nDedo polegar: ";
		str += " Dist�ncia distal-palma: " + this.getPolegar().getDistanciaDistal();
		
		str += "\nRota��o lateral: " + this.getRotacaoLateral();
		str += "\nRota��o longitudinal: " + this.getRotacaoLongitudinal();
		str += "\nRota��o vertical: " + this.getRotacaoVertical();
		return str;
	}
}
