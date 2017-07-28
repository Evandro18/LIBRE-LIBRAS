package br.edu.ifms.aquidauana.pibic.listener;

import com.leapmotion.leap.Bone;
import com.leapmotion.leap.Controller;
import com.leapmotion.leap.Finger;
import com.leapmotion.leap.FingerList;
import com.leapmotion.leap.Frame;
import com.leapmotion.leap.Hand;
import com.leapmotion.leap.HandList;
import com.leapmotion.leap.Listener;
import com.leapmotion.leap.Vector;

import br.edu.ifms.aquidauana.pibic.model.Dedo;
import br.edu.ifms.aquidauana.pibic.model.Mao;

public class ExemploListener extends Listener {

	private Mao maoAuxiliar;

	public void onConnect(Controller controller) {
		System.out.println("Connected");
	}

	public void onFrame(Controller controller) {
		Frame frame = controller.frame();
		HandList maos = frame.hands();
		if (maos != null && !maos.isEmpty()) {

			for (Hand mao : maos) {
				Mao novaMao = new Mao();
				novaMao.setEsquerda(mao.isLeft());
				novaMao.setDireita(mao.isRight());
				novaMao.setRotacaoLateral(mao.direction().pitch());
				novaMao.setRotacaoVertical(mao.direction().roll());
				novaMao.setRotacaoLongitudinal(mao.direction().yaw());

				Vector posicaoPalma = mao.palmPosition();

				FingerList dedos = mao.fingers();
				if (dedos != null && !dedos.isEmpty()) {
					for (Finger dedo : dedos) {
						Dedo novoDedo = new Dedo();
						for (Bone.Type tipoOsso : Bone.Type.values()) {
							Bone osso = dedo.bone(tipoOsso);
							Float distancia = osso.center().distanceTo(posicaoPalma);

							if (osso.type() == Bone.Type.TYPE_DISTAL) {
								novoDedo.setDistanciaDistal(distancia);
								novoDedo.setOssoDistal(osso);
							}
							
							if (dedo.type() == Finger.Type.TYPE_INDEX) {
								novaMao.setIndicador(novoDedo);
							} else if (dedo.type() == Finger.Type.TYPE_MIDDLE) {
								novaMao.setMedio(novoDedo);
							} else if (dedo.type() == Finger.Type.TYPE_PINKY) {
								novaMao.setMinimo(novoDedo);
							} else if (dedo.type() == Finger.Type.TYPE_RING) {
								novaMao.setAnelar(novoDedo);
							} else {
								novaMao.setPolegar(novoDedo);
							}
						}
					}
				}
				novaMao.getMedio().setDistanciaLateralEsquerda(calculaDistanciaEuclidiana(novaMao.getIndicador().getOssoDistal().center(), novaMao.getMedio().getOssoDistal().center()));
				novaMao.getAnelar().setDistanciaLateralEsquerda(calculaDistanciaEuclidiana(novaMao.getMedio().getOssoDistal().center(), novaMao.getAnelar().getOssoDistal().center()));
				novaMao.getMinimo().setDistanciaLateralEsquerda(calculaDistanciaEuclidiana(novaMao.getAnelar().getOssoDistal().center(), novaMao.getMinimo().getOssoDistal().center()));
//				System.out.println(novaMao);
				maoAuxiliar = novaMao;
			}
		}
	}

	public Mao getMaoAux() {
		return maoAuxiliar;
	}

	public double calculaDistanciaEuclidiana(Vector pontoInicial, Vector pontoFinal) {
		return Math.sqrt(Math.pow(pontoInicial.getX() - pontoFinal.getX(), 2)
				+ Math.pow(pontoInicial.getY() - pontoFinal.getY(), 2)
				+ Math.pow(pontoInicial.getZ() - pontoFinal.getZ(), 2));
	}
}

/*
 * System.out.println("distancia LeapMotion: " + distancia +
 * " distanciaEuclidiana: " + calculaDistanciaEuclidiana(osso.center(),
 * posicaoPalma));
 */