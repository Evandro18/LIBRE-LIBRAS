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
		str += " Dist�ncia medial-palma: " + this.getMinimo().getDistanciaMedial();
		str += " Dist�ncia proximal-palma: " + this.getMinimo().getDistanciaProximal();
		str += " Dist�ncia metacarpal-palma: " + this.getMinimo().getDistanciaMetacarpal();
		str += "\nDedo anelar: ";
		str += " Dist�ncia distal-palma: " + this.getAnelar().getDistanciaDistal();
		str += " Dist�ncia medial-palma: " + this.getAnelar().getDistanciaMedial();
		str += " Dist�ncia proximal-palma: " + this.getAnelar().getDistanciaProximal();
		str += " Dist�ncia metacarpal-palma: " + this.getAnelar().getDistanciaMetacarpal();
		str += "\nDedo m�dio: ";
		str += " Dist�ncia distal-palma: " + this.getMedio().getDistanciaDistal();
		str += " Dist�ncia medial-palma: " + this.getMedio().getDistanciaMedial();
		str += " Dist�ncia proximal-palma: " + this.getMedio().getDistanciaProximal();
		str += " Dist�ncia metacarpal-palma: " + this.getMedio().getDistanciaMetacarpal();
		str += "\nDedo indicador: ";
		str += " Dist�ncia distal-palma: " + this.getIndicador().getDistanciaDistal();
		str += " Dist�ncia medial-palma: " + this.getIndicador().getDistanciaMedial();
		str += " Dist�ncia proximal-palma: " + this.getIndicador().getDistanciaProximal();
		str += " Dist�ncia metacarpal-palma: " + this.getIndicador().getDistanciaMetacarpal();
		str += "\nDedo polegar: ";
		str += " Dist�ncia distal-palma: " + this.getPolegar().getDistanciaDistal();
		str += " Dist�ncia medial-palma: " + this.getPolegar().getDistanciaMedial();
		str += " Dist�ncia proximal-palma: " + this.getPolegar().getDistanciaProximal();
		str += " Dist�ncia metacarpal-palma: " + this.getPolegar().getDistanciaMetacarpal();
		str += "\nRota��o lateral: " + this.getRotacaoLateral();
		str += "\nRota��o longitudinal: " + this.getRotacaoLongitudinal();
		str += "\nRota��o vertical: " + this.getRotacaoVertical();
		return str;
	}

}
