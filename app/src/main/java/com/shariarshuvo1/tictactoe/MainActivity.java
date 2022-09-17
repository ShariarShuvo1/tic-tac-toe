package com.shariarshuvo1.tictactoe;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private ImageButton box_1,box_2,box_3,box_4,box_5,box_6,box_7,box_8,box_9;
    private TextView display;
    private Button restart_button;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // ---------declaing---------
        box_1=findViewById(R.id.box_1);
        box_2=findViewById(R.id.box_2);
        box_3=findViewById(R.id.box_3);
        box_4=findViewById(R.id.box_4);
        box_5=findViewById(R.id.box_5);
        box_6=findViewById(R.id.box_6);
        box_7=findViewById(R.id.box_7);
        box_8=findViewById(R.id.box_8);
        box_9=findViewById(R.id.box_9);
        display=findViewById(R.id.v_display);
        restart_button=findViewById(R.id.restart_button);
        //----------end of declaring----------
//        String play = "y";
//        while (play == "y"){
        Integer[] player = {0} ;
        String[] game={"empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"};
//        String[] winner= {"no"};
        //------------
        restart_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
                startActivity(getIntent());
                overridePendingTransition(0, 0);
                String time = System.currentTimeMillis() + "";
            }
        });
        //------------
        box_1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (game[0]=="empty"){
                    player[0]++;
                    Integer temp_player = (player[0]%2); //1 is player 1, 0 is player 2
                    if (temp_player == 1){
                        game[0]="X";
                        box_1.setImageDrawable(getResources().getDrawable(R.drawable.cross_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 1 Won\nCongratulation");
//                            winner[0]="yes";
                        }
                    }
                    else{
                        game[0]="O";
                        box_1.setImageDrawable(getResources().getDrawable(R.drawable.circle_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 2 Won\nCongratulation");
                        }
                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "Please select empty slot", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //------------
        //------------
        box_2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (game[1]=="empty"){
                    player[0]++;
                    Integer temp_player = (player[0]%2); //1 is player 1, 0 is player 2
                    if (temp_player == 1){
                        game[1]="X";
                        box_2.setImageDrawable(getResources().getDrawable(R.drawable.cross_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 1 Won\nCongratulation");
                        }
                    }
                    else{
                        game[1]="O";
                        box_2.setImageDrawable(getResources().getDrawable(R.drawable.circle_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 2 Won\nCongratulation");
                        }
                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "Please select empty slot", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //------------
        //------------
        box_3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (game[2]=="empty"){
                    player[0]++;
                    Integer temp_player = (player[0]%2); //1 is player 1, 0 is player 2
                    if (temp_player == 1){
                        game[2]="X";
                        box_3.setImageDrawable(getResources().getDrawable(R.drawable.cross_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 1 Won\nCongratulation");
                        }
                    }
                    else{
                        game[2]="O";
                        box_3.setImageDrawable(getResources().getDrawable(R.drawable.circle_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 2 Won\nCongratulation");
                        }
                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "Please select empty slot", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //------------
        //------------
        box_4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (game[3]=="empty"){
                    player[0]++;
                    Integer temp_player = (player[0]%2); //1 is player 1, 0 is player 2
                    if (temp_player == 1){
                        game[3]="X";
                        box_4.setImageDrawable(getResources().getDrawable(R.drawable.cross_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 1 Won\nCongratulation");
                        }
                    }
                    else{
                        game[3]="O";
                        box_4.setImageDrawable(getResources().getDrawable(R.drawable.circle_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 2 Won\nCongratulation");
                        }
                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "Please select empty slot", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //------------
        //------------
        box_5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (game[4]=="empty"){
                    player[0]++;
                    Integer temp_player = (player[0]%2); //1 is player 1, 0 is player 2
                    if (temp_player == 1){
                        game[4]="X";
                        box_5.setImageDrawable(getResources().getDrawable(R.drawable.cross_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 1 Won\nCongratulation");
                        }
                    }
                    else{
                        game[4]="O";
                        box_5.setImageDrawable(getResources().getDrawable(R.drawable.circle_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 2 Won\nCongratulation");
                        }
                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "Please select empty slot", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //------------
        //------------
        box_6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (game[5]=="empty"){
                    player[0]++;
                    Integer temp_player = (player[0]%2); //1 is player 1, 0 is player 2
                    if (temp_player == 1){
                        game[5]="X";
                        box_6.setImageDrawable(getResources().getDrawable(R.drawable.cross_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 1 Won\nCongratulation");
                        }
                    }
                    else{
                        game[5]="O";
                        box_6.setImageDrawable(getResources().getDrawable(R.drawable.circle_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 2 Won\nCongratulation");
                        }
                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "Please select empty slot", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //------------
        //------------
        box_7.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (game[6]=="empty"){
                    player[0]++;
                    Integer temp_player = (player[0]%2); //1 is player 1, 0 is player 2
                    if (temp_player == 1){
                        game[6]="X";
                        box_7.setImageDrawable(getResources().getDrawable(R.drawable.cross_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 1 Won\nCongratulation");
                        }
                    }
                    else{
                        game[6]="O";
                        box_7.setImageDrawable(getResources().getDrawable(R.drawable.circle_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 2 Won\nCongratulation");
                        }
                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "Please select empty slot", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //------------
        //------------
        box_8.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (game[7]=="empty"){
                    player[0]++;
                    Integer temp_player = (player[0]%2); //1 is player 1, 0 is player 2
                    if (temp_player == 1){
                        game[7]="X";
                        box_8.setImageDrawable(getResources().getDrawable(R.drawable.cross_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 1 Won\nCongratulation");
                        }
                    }
                    else{
                        game[7]="O";
                        box_8.setImageDrawable(getResources().getDrawable(R.drawable.circle_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 2 Won\nCongratulation");
                        }
                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "Please select empty slot", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //------------
        //------------
        box_9.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (game[8]=="empty"){
                    player[0]++;
                    Integer temp_player = (player[0]%2); //1 is player 1, 0 is player 2
                    if (temp_player == 1){
                        game[8]="X";
                        box_9.setImageDrawable(getResources().getDrawable(R.drawable.cross_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 1 Won\nCongratulation");
                        }
                    }
                    else{
                        game[8]="O";
                        box_9.setImageDrawable(getResources().getDrawable(R.drawable.circle_sign));
                        if ( ((game[0] == game[1]) && (game[1]==game[2]) && (game[0] != "empty")) || ((game[3] == game[4]) && (game[4]==game[5]) && (game[3] != "empty")) || ((game[6] == game[7]) && (game[7]==game[8]) && (game[6] != "empty")) || ((game[0] == game[3]) && (game[3]==game[6]) && (game[0] != "empty")) || ((game[1] == game[4]) && (game[4]==game[7]) && (game[1] != "empty")) || ((game[2] == game[5]) && (game[5]==game[8]) && (game[2] != "empty")) || ((game[0] == game[4]) && (game[4]==game[8]) && (game[0] != "empty")) || ((game[2] == game[4]) && (game[4]==game[6]) && (game[2] != "empty")) ) {
                            display.setText("Player 2 Won\nCongratulation");
                        }
                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "Please select empty slot", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //------------
    }
}
