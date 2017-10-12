package br.edu.ifms.aquidauana.pibic.teste;

import java.io.IOException;

import com.leapmotion.leap.Controller;

import br.edu.ifms.aquidauana.pibic.listener.ExemploListener;

public class Teste {

	public static void main(String[] args) {
		// Create a sample listener and controller
		ExemploListener listener = new ExemploListener();
		Controller controlador = new Controller();

		// Have the sample listener receive events from the controller
		controlador.addListener(listener);

		// Keep this process running until Enter is pressed
		System.out.println("Aperte ENTER para sair...");
		try {
			System.in.read();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// Remove the sample listener when done
		controlador.removeListener(listener);

	}

}
