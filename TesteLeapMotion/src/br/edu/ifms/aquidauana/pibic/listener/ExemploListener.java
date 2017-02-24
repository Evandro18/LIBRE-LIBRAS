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

	public void onConnect(Controller controller) {
		System.out.println("Connected");
	}

	public void onFrame(Controller controller) {
		Frame frame = controller.frame();
		HandList maos = frame.hands();
		if (maos != null && !maos.isEmpty())
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
							} else if (osso.type() == Bone.Type.TYPE_INTERMEDIATE) {
								novoDedo.setDistanciaMedial(distancia);
							} else if (osso.type() == Bone.Type.TYPE_METACARPAL) {
								novoDedo.setDistanciaMetacarpal(distancia);
							} else {
								novoDedo.setDistanciaProximal(distancia);
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
				System.out.println(novaMao);
				System.out.println();
			}
	}
}
