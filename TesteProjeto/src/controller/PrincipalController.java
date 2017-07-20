package controller;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

import org.controlsfx.control.Notifications;

import com.leapmotion.leap.Controller;

import br.edu.ifms.aquidauana.pibic.listener.ExemploListener;
import br.edu.ifms.aquidauana.pibic.model.Mao;
import javafx.concurrent.Task;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Pos;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Pane;

public class PrincipalController implements Initializable {

	private Mao novaMao;

	@FXML
	private Label labelInfo;

	@FXML
	private AnchorPane anchorPane;

	@FXML
	private Pane pane;

	@FXML
	private Button btnCapturar;

	private ExemploListener listener;

	private Controller controlador;

	@FXML
	private Label rotacaoLongitudinalEsquerda;

	@FXML
	private Label rotacaoLateralDireita;

	@FXML
	private Label rotacaoVerticalEsquerda;

	@FXML
	private Label rotacaoVerticalDireita;

	@FXML
	private Label rotacaoLateralEsquerda;

	@FXML
	private Label rotacaoLongitudinalDireita;

	@FXML
	private Label distanciaD1D;

	@FXML
	private Label distanciaD5E;

	@FXML
	private Label distanciaD3D;

	@FXML
	private Label distanciaD7E;

	@FXML
	private Label distanciaD5D;

	@FXML
	private Label distanciaD7D;
	@FXML
	private Label distanciaD3E;

	@FXML
	private Label distanciaD1E;

	@FXML
	private Label distanciaD6D;

	@FXML
	private Label distanciaD6E;

	@FXML
	private Label distanciaD8D;

	@FXML
	private Label distanciaD8E;

	@FXML
	private Label distanciaD2D;

	@FXML
	private Label distanciaD2E;

	@FXML
	private Label distanciaD4D;

	@FXML
	private Label distanciaD4E;

	@FXML
	private Button btnRecarregar;
	
    @FXML
    private TextField nomeSinal;

	@Override
	public void initialize(URL arg0, ResourceBundle arg1) {

		iniciarleitura();

		btnCapturar.setOnAction(new EventHandler<ActionEvent>() {

			@Override
			public void handle(ActionEvent event) {
				novaMao = listener.getMaoAux();
				if (btnCapturar.getText().equals("SALVAR")) {
					Notifications.create().title("Notificação").text("Dados salvos com sucesso")
							.position(Pos.BASELINE_RIGHT).show();
				} else {
					if (novaMao != null) {
						setaValores();
						atualizaBotaoPrincipal();
					} else {
						Alert alert = new Alert(Alert.AlertType.WARNING);
						alert.setTitle("Nenhuma mão foi reconhecida");
						alert.setContentText("Verifique-se o Leap Motion está conectado!");
						alert.setHeaderText("Atenção");
						alert.show();
					}
				}
			}
		});
	}

	public String formata(double d) {
		String str = String.format("%.2f", d);
		return str;

	}

	public String formata(Float f) {
		String str = String.format("%.2f", f);
		return str;
	}

	public void iniciarleitura() {

		new Thread(new Task<Object>() {

			@Override
			protected Object call() throws Exception {
				// Create a sample listener and controller
				listener = new ExemploListener();
				controlador = new Controller();

				// Have the sample listener receive events from the controller
				controlador.addListener(listener);
				// Keep this process running until Enter is pressed
				System.out.println("Leitura iniciada!");
				try {
					System.in.read();
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null;
			}
		}).start();

		btnRecarregar.setOnAction(new EventHandler<ActionEvent>() {

			@Override
			public void handle(ActionEvent event) {
				if (btnCapturar.getText().equalsIgnoreCase("SALVAR")) {
					btnCapturar.setText("CAPTURAR SINAL");
				}
			}
		});
	}

	private void atualizaBotaoPrincipal() {
		if (btnCapturar.getText().equalsIgnoreCase("SALVAR")) {
			btnCapturar.setText("CAPTURAR SINAL");
		} else {
			btnCapturar.setText("SALVAR");
		}
	}

	public void salvar() {
		atualizaBotaoPrincipal();
	}
	
	public void setaValores(){
		if (novaMao.isDireita()) {
			System.out.println(novaMao);
			distanciaD1D.setText(formata(novaMao.getPolegar().getDistanciaDistal()));
			distanciaD2D.setText(formata(novaMao.getIndicador().getDistanciaDistal()));
			distanciaD3D.setText(formata(novaMao.getMedio().getDistanciaDistal()));
			distanciaD4D.setText(formata(novaMao.getMedio().getDistanciaLateralEsquerda()));
			distanciaD5D.setText(formata(novaMao.getAnelar().getDistanciaDistal()));
			distanciaD6D.setText(formata(novaMao.getAnelar().getDistanciaLateralEsquerda()));
			distanciaD7D.setText(formata((novaMao.getMinimo().getDistanciaDistal())));
			distanciaD8D.setText(formata(novaMao.getMinimo().getDistanciaLateralEsquerda()));
			rotacaoLateralDireita.setText(formata(novaMao.getRotacaoLateral()));
			rotacaoLongitudinalDireita.setText(formata(novaMao.getRotacaoLongitudinal()));
			rotacaoVerticalDireita.setText(formata(novaMao.getRotacaoVertical()));
		} else {
			distanciaD1E.setText(formata(novaMao.getPolegar().getDistanciaDistal()));
			distanciaD2E.setText(formata(novaMao.getIndicador().getDistanciaDistal()));
			distanciaD3E.setText(formata(novaMao.getMedio().getDistanciaDistal()));
			distanciaD4E.setText(formata(novaMao.getMedio().getDistanciaLateralEsquerda()));
			distanciaD5E.setText(formata(novaMao.getAnelar().getDistanciaDistal()));
			distanciaD6E.setText(formata(novaMao.getAnelar().getDistanciaLateralEsquerda()));
			distanciaD7E.setText(formata((novaMao.getMinimo().getDistanciaDistal())));
			distanciaD8E.setText(formata(novaMao.getMinimo().getDistanciaLateralEsquerda()));
			rotacaoLateralEsquerda.setText(formata(novaMao.getRotacaoLateral()));
			rotacaoLongitudinalEsquerda.setText(formata(novaMao.getRotacaoLongitudinal()));
			rotacaoVerticalEsquerda.setText(formata(novaMao.getRotacaoVertical()));
		}
	}
}
