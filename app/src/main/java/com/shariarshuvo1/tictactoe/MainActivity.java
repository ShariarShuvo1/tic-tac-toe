package com.shariarshuvo1.tictactoe;

import androidx.appcompat.app.AppCompatActivity;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private ImageButton box1,box2,box3,box4,box5,box6,box7,box8,box9,restart_button;
    private TextView display;
    private ImageView hr1,hr2,hr3,vr1,vr2,vr3,tan1,tan2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //-----------------Button Declare-----------------------//
        ImageButton box1=findViewById(R.id.box1);
        ImageButton box2=findViewById(R.id.box2);
        ImageButton box3=findViewById(R.id.box3);
        ImageButton box4=findViewById(R.id.box4);
        ImageButton box5=findViewById(R.id.box5);
        ImageButton box6=findViewById(R.id.box6);
        ImageButton box7=findViewById(R.id.box7);
        ImageButton box8=findViewById(R.id.box8);
        ImageButton box9=findViewById(R.id.box9);
        ImageButton restart_button=findViewById(R.id.restart_button);
        TextView display=findViewById(R.id.display);
        ImageView hr1=findViewById(R.id.horizontal_1);
        ImageView hr2=findViewById(R.id.horizontal_2);
        ImageView hr3=findViewById(R.id.horizontal_3);
        ImageView vr1=findViewById(R.id.vertical_1);
        ImageView vr2=findViewById(R.id.vertical_2);
        ImageView vr3=findViewById(R.id.vertical_3);
        ImageView tan1=findViewById(R.id.tangent_LtoR);
        ImageView tan2=findViewById(R.id.tangent_RtoL);
        final MediaPlayer mp=MediaPlayer.create(this, R.raw.bp);
        final MediaPlayer wp=MediaPlayer.create(this, R.raw.win_celeb);
        //----------------------------------------//

        //----------------Global Variable------------------------//
        String[] game={"A", "A", "A", "A", "A", "A", "A", "A", "A"};
        boolean[] winner={false,false}; //winner_found; game_end;
        Integer[] player={0};
        //----------------------------------------//


        //-------------------box1-----------------//
        box1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mp.start();
                if (game[0] == "A") {
                    Integer temp_player=(player[0]%2) +1;
                    String player_winner="Winnner is:\nPlayer " + temp_player;
                    if (player[0] % 2 == 0) {
                        display.setText("Player 2:");
                        box1.setImageDrawable(getResources().getDrawable(R.drawable.cross));
                        game[0] = "X";
                    } else {
                        display.setText("Player 1:");
                        box1.setImageDrawable(getResources().getDrawable(R.drawable.circle));
                        game[0] = "O";
                    }
                    if ((game[0]==game[1]) && (game[1]==game[2]) && (game[0] != "A")){
                        winner[0]=true;
                        hr1.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[3]==game[4]) && (game[4]==game[5]) && (game[3] != "A")){
                        winner[0]=true;
                        hr2.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[6]==game[7]) && (game[7]==game[8]) && (game[6] != "A")){
                        winner[0]=true;
                        hr3.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[0]==game[3]) && (game[3]==game[6]) && (game[0] != "A")){
                        winner[0]=true;
                        vr1.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[1]==game[4]) && (game[4]==game[7]) && (game[1] != "A")){
                        winner[0]=true;
                        vr2.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[2]==game[5]) && (game[5]==game[8]) && (game[2] != "A")){
                        winner[0]=true;
                        vr3.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[0]==game[4]) && (game[4]==game[8]) && (game[0] != "A")){
                        winner[0]=true;
                        tan1.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else if ((game[2]==game[4]) && (game[4]==game[6]) && (game[2] != "A")){
                        winner[0]=true;
                        tan2.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else{
                        winner[0]=false;
                    }
                    if (winner[0]==true){
                        wp.start();
                        display.setText(player_winner);
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    if (player[0]==8 && winner[0]==false){
                        winner[1]=true;
                        display.setText("Tie!!!\nPlay Again");
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    else{
                        player[0]++;
                    }
                }
                else{
                    Toast.makeText(MainActivity.this, "Slot taken! Click Another...", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //-------------------box1-----------------//
        //-------------------box2-----------------//
        box2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mp.start();
                if (game[1] == "A") {
                    Integer temp_player=(player[0]%2) +1;
                    String player_winner="Winnner is:\nPlayer " + temp_player;
                    if (player[0] % 2 == 0) {
                        display.setText("Player 2:");
                        box2.setImageDrawable(getResources().getDrawable(R.drawable.cross));
                        game[1] = "X";
                    } else {
                        display.setText("Player 1:");
                        box2.setImageDrawable(getResources().getDrawable(R.drawable.circle));
                        game[1] = "O";
                    }
                    if ((game[0]==game[1]) && (game[1]==game[2]) && (game[0] != "A")){
                        winner[0]=true;
                        hr1.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[3]==game[4]) && (game[4]==game[5]) && (game[3] != "A")){
                        winner[0]=true;
                        hr2.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[6]==game[7]) && (game[7]==game[8]) && (game[6] != "A")){
                        winner[0]=true;
                        hr3.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[0]==game[3]) && (game[3]==game[6]) && (game[0] != "A")){
                        winner[0]=true;
                        vr1.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[1]==game[4]) && (game[4]==game[7]) && (game[1] != "A")){
                        winner[0]=true;
                        vr2.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[2]==game[5]) && (game[5]==game[8]) && (game[2] != "A")){
                        winner[0]=true;
                        vr3.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[0]==game[4]) && (game[4]==game[8]) && (game[0] != "A")){
                        winner[0]=true;
                        tan1.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else if ((game[2]==game[4]) && (game[4]==game[6]) && (game[2] != "A")){
                        winner[0]=true;
                        tan2.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else{
                        winner[0]=false;
                    }
                    if (winner[0]==true){
                        wp.start();
                        display.setText(player_winner);
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    if (player[0]==8 && winner[0]==false){
                        winner[1]=true;
                        display.setText("Tie!!!\nPlay Again");
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    else{
                        player[0]++;
                    }
                }
                else{
                    Toast.makeText(MainActivity.this, "Slot taken! Click Another...", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //-------------------box2-----------------//
        //-------------------box3-----------------//
        box3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mp.start();
                if (game[2] == "A") {
                    Integer temp_player=(player[0]%2) +1;
                    String player_winner="Winnner is:\nPlayer " + temp_player;
                    if (player[0] % 2 == 0) {
                        display.setText("Player 2:");
                        box3.setImageDrawable(getResources().getDrawable(R.drawable.cross));
                        game[2] = "X";
                    } else {
                        display.setText("Player 1:");
                        box3.setImageDrawable(getResources().getDrawable(R.drawable.circle));
                        game[2] = "O";
                    }
                    if ((game[0]==game[1]) && (game[1]==game[2]) && (game[0] != "A")){
                        winner[0]=true;
                        hr1.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[3]==game[4]) && (game[4]==game[5]) && (game[3] != "A")){
                        winner[0]=true;
                        hr2.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[6]==game[7]) && (game[7]==game[8]) && (game[6] != "A")){
                        winner[0]=true;
                        hr3.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[0]==game[3]) && (game[3]==game[6]) && (game[0] != "A")){
                        winner[0]=true;
                        vr1.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[1]==game[4]) && (game[4]==game[7]) && (game[1] != "A")){
                        winner[0]=true;
                        vr2.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[2]==game[5]) && (game[5]==game[8]) && (game[2] != "A")){
                        winner[0]=true;
                        vr3.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[0]==game[4]) && (game[4]==game[8]) && (game[0] != "A")){
                        winner[0]=true;
                        tan1.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else if ((game[2]==game[4]) && (game[4]==game[6]) && (game[2] != "A")){
                        winner[0]=true;
                        tan2.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else{
                        winner[0]=false;
                    }
                    if (winner[0]==true){
                        wp.start();
                        display.setText(player_winner);
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    if (player[0]==8 && winner[0]==false){
                        winner[1]=true;
                        display.setText("Tie!!!\nPlay Again");
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);

                    }
                    else{
                        player[0]++;
                    }
                }
                else{
                    Toast.makeText(MainActivity.this, "Slot taken! Click Another...", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //-------------------box3-----------------//
        //-------------------box4-----------------//
        box4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mp.start();
                if (game[3] == "A") {
                    Integer temp_player=(player[0]%2) +1;
                    String player_winner="Winnner is:\nPlayer " + temp_player;
                    if (player[0] % 2 == 0) {
                        display.setText("Player 2:");
                        box4.setImageDrawable(getResources().getDrawable(R.drawable.cross));
                        game[3] = "X";
                    } else {
                        display.setText("Player 1:");
                        box4.setImageDrawable(getResources().getDrawable(R.drawable.circle));
                        game[3] = "O";
                    }
                    if ((game[0]==game[1]) && (game[1]==game[2]) && (game[0] != "A")){
                        winner[0]=true;
                        hr1.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[3]==game[4]) && (game[4]==game[5]) && (game[3] != "A")){
                        winner[0]=true;
                        hr2.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[6]==game[7]) && (game[7]==game[8]) && (game[6] != "A")){
                        winner[0]=true;
                        hr3.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[0]==game[3]) && (game[3]==game[6]) && (game[0] != "A")){
                        winner[0]=true;
                        vr1.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[1]==game[4]) && (game[4]==game[7]) && (game[1] != "A")){
                        winner[0]=true;
                        vr2.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[2]==game[5]) && (game[5]==game[8]) && (game[2] != "A")){
                        winner[0]=true;
                        vr3.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[0]==game[4]) && (game[4]==game[8]) && (game[0] != "A")){
                        winner[0]=true;
                        tan1.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else if ((game[2]==game[4]) && (game[4]==game[6]) && (game[2] != "A")){
                        winner[0]=true;
                        tan2.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else{
                        winner[0]=false;
                    }
                    if (winner[0]==true){
                        wp.start();
                        display.setText(player_winner);
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    if (player[0]==8 && winner[0]==false){
                        winner[1]=true;
                        display.setText("Tie!!!\nPlay Again");
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    else{
                        player[0]++;
                    }
                }
                else{
                    Toast.makeText(MainActivity.this, "Slot taken! Click Another...", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //-------------------box4-----------------//
        //-------------------box5-----------------//
        box5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mp.start();
                if (game[4] == "A") {
                    Integer temp_player=(player[0]%2) +1;
                    String player_winner="Winnner is:\nPlayer " + temp_player;
                    if (player[0] % 2 == 0) {
                        display.setText("Player 2:");
                        box5.setImageDrawable(getResources().getDrawable(R.drawable.cross));
                        game[4] = "X";
                    } else {
                        display.setText("Player 1:");
                        box5.setImageDrawable(getResources().getDrawable(R.drawable.circle));
                        game[4] = "O";
                    }
                    if ((game[0]==game[1]) && (game[1]==game[2]) && (game[0] != "A")){
                        winner[0]=true;
                        hr1.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[3]==game[4]) && (game[4]==game[5]) && (game[3] != "A")){
                        winner[0]=true;
                        hr2.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[6]==game[7]) && (game[7]==game[8]) && (game[6] != "A")){
                        winner[0]=true;
                        hr3.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[0]==game[3]) && (game[3]==game[6]) && (game[0] != "A")){
                        winner[0]=true;
                        vr1.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[1]==game[4]) && (game[4]==game[7]) && (game[1] != "A")){
                        winner[0]=true;
                        vr2.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[2]==game[5]) && (game[5]==game[8]) && (game[2] != "A")){
                        winner[0]=true;
                        vr3.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[0]==game[4]) && (game[4]==game[8]) && (game[0] != "A")){
                        winner[0]=true;
                        tan1.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else if ((game[2]==game[4]) && (game[4]==game[6]) && (game[2] != "A")){
                        winner[0]=true;
                        tan2.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else{
                        winner[0]=false;
                    }
                    if (winner[0]==true){
                        wp.start();
                        display.setText(player_winner);
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    if (player[0]==8 && winner[0]==false){
                        winner[1]=true;
                        display.setText("Tie!!!\nPlay Again");
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    else{
                        player[0]++;
                    }
                }
                else{
                    Toast.makeText(MainActivity.this, "Slot taken! Click Another...", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //-------------------box5-----------------//
        //-------------------box6-----------------//
        box6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mp.start();
                if (game[5] == "A") {
                    Integer temp_player=(player[0]%2) +1;
                    String player_winner="Winnner is:\nPlayer " + temp_player;
                    if (player[0] % 2 == 0) {
                        display.setText("Player 2:");
                        box6.setImageDrawable(getResources().getDrawable(R.drawable.cross));
                        game[5] = "X";
                    } else {
                        display.setText("Player 1:");
                        box6.setImageDrawable(getResources().getDrawable(R.drawable.circle));
                        game[5] = "O";
                    }
                    if ((game[0]==game[1]) && (game[1]==game[2]) && (game[0] != "A")){
                        winner[0]=true;
                        hr1.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[3]==game[4]) && (game[4]==game[5]) && (game[3] != "A")){
                        winner[0]=true;
                        hr2.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[6]==game[7]) && (game[7]==game[8]) && (game[6] != "A")){
                        winner[0]=true;
                        hr3.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[0]==game[3]) && (game[3]==game[6]) && (game[0] != "A")){
                        winner[0]=true;
                        vr1.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[1]==game[4]) && (game[4]==game[7]) && (game[1] != "A")){
                        winner[0]=true;
                        vr2.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[2]==game[5]) && (game[5]==game[8]) && (game[2] != "A")){
                        winner[0]=true;
                        vr3.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[0]==game[4]) && (game[4]==game[8]) && (game[0] != "A")){
                        winner[0]=true;
                        tan1.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else if ((game[2]==game[4]) && (game[4]==game[6]) && (game[2] != "A")){
                        winner[0]=true;
                        tan2.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else{
                        winner[0]=false;
                    }
                    if (winner[0]==true){
                        wp.start();
                        display.setText(player_winner);
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    if (player[0]==8 && winner[0]==false){
                        winner[1]=true;
                        display.setText("Tie!!!\nPlay Again");
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    else{
                        player[0]++;
                    }
                }
                else{
                    Toast.makeText(MainActivity.this, "Slot taken! Click Another...", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //-------------------box6-----------------//
        //-------------------box7-----------------//
        box7.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mp.start();
                if (game[6] == "A") {
                    Integer temp_player=(player[0]%2) +1;
                    String player_winner="Winnner is:\nPlayer " + temp_player;
                    if (player[0] % 2 == 0) {
                        display.setText("Player 2:");
                        box7.setImageDrawable(getResources().getDrawable(R.drawable.cross));
                        game[6] = "X";
                    } else {
                        display.setText("Player 1:");
                        box7.setImageDrawable(getResources().getDrawable(R.drawable.circle));
                        game[6] = "O";
                    }
                    if ((game[0]==game[1]) && (game[1]==game[2]) && (game[0] != "A")){
                        winner[0]=true;
                        hr1.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[3]==game[4]) && (game[4]==game[5]) && (game[3] != "A")){
                        winner[0]=true;
                        hr2.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[6]==game[7]) && (game[7]==game[8]) && (game[6] != "A")){
                        winner[0]=true;
                        hr3.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[0]==game[3]) && (game[3]==game[6]) && (game[0] != "A")){
                        winner[0]=true;
                        vr1.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[1]==game[4]) && (game[4]==game[7]) && (game[1] != "A")){
                        winner[0]=true;
                        vr2.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[2]==game[5]) && (game[5]==game[8]) && (game[2] != "A")){
                        winner[0]=true;
                        vr3.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[0]==game[4]) && (game[4]==game[8]) && (game[0] != "A")){
                        winner[0]=true;
                        tan1.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else if ((game[2]==game[4]) && (game[4]==game[6]) && (game[2] != "A")){
                        winner[0]=true;
                        tan2.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else{
                        winner[0]=false;
                    }
                    if (winner[0]==true){
                        wp.start();
                        display.setText(player_winner);
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    if (player[0]==8 && winner[0]==false){
                        winner[1]=true;
                        display.setText("Tie!!!\nPlay Again");
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    else{
                        player[0]++;
                    }
                }
                else{
                    Toast.makeText(MainActivity.this, "Slot taken! Click Another...", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //-------------------box7-----------------//
        //-------------------box8-----------------//
        box8.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mp.start();
                if (game[7] == "A") {
                    Integer temp_player=(player[0]%2) +1;
                    String player_winner="Winnner is:\nPlayer " + temp_player;
                    if (player[0] % 2 == 0) {
                        display.setText("Player 2:");
                        box8.setImageDrawable(getResources().getDrawable(R.drawable.cross));
                        game[7] = "X";
                    } else {
                        display.setText("Player 1:");
                        box8.setImageDrawable(getResources().getDrawable(R.drawable.circle));
                        game[7] = "O";
                    }
                    if ((game[0]==game[1]) && (game[1]==game[2]) && (game[0] != "A")){
                        winner[0]=true;
                        hr1.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[3]==game[4]) && (game[4]==game[5]) && (game[3] != "A")){
                        winner[0]=true;
                        hr2.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[6]==game[7]) && (game[7]==game[8]) && (game[6] != "A")){
                        winner[0]=true;
                        hr3.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[0]==game[3]) && (game[3]==game[6]) && (game[0] != "A")){
                        winner[0]=true;
                        vr1.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[1]==game[4]) && (game[4]==game[7]) && (game[1] != "A")){
                        winner[0]=true;
                        vr2.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[2]==game[5]) && (game[5]==game[8]) && (game[2] != "A")){
                        winner[0]=true;
                        vr3.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[0]==game[4]) && (game[4]==game[8]) && (game[0] != "A")){
                        winner[0]=true;
                        tan1.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else if ((game[2]==game[4]) && (game[4]==game[6]) && (game[2] != "A")){
                        winner[0]=true;
                        tan2.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else{
                        winner[0]=false;
                    }
                    if (winner[0]==true){
                        wp.start();
                        display.setText(player_winner);
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    if (player[0]==8 && winner[0]==false){
                        winner[1]=true;
                        display.setText("Tie!!!\nPlay Again");
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    else{
                        player[0]++;
                    }
                }
                else{
                    Toast.makeText(MainActivity.this, "Slot taken! Click Another...", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //-------------------box8-----------------//
        //-------------------box9-----------------//
        box9.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mp.start();
                if (game[8] == "A") {
                    Integer temp_player=(player[0]%2) +1;
                    String player_winner="Winnner is:\nPlayer " + temp_player;
                    if (player[0] % 2 == 0) {
                        display.setText("Player 2:");
                        box9.setImageDrawable(getResources().getDrawable(R.drawable.cross));
                        game[8] = "X";
                    } else {
                        display.setText("Player 1:");
                        box9.setImageDrawable(getResources().getDrawable(R.drawable.circle));
                        game[8] = "O";
                    }
                    if ((game[0]==game[1]) && (game[1]==game[2]) && (game[0] != "A")){
                        winner[0]=true;
                        hr1.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[3]==game[4]) && (game[4]==game[5]) && (game[3] != "A")){
                        winner[0]=true;
                        hr2.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[6]==game[7]) && (game[7]==game[8]) && (game[6] != "A")){
                        winner[0]=true;
                        hr3.setImageDrawable(getResources().getDrawable(R.drawable.line_potrait));
                    }
                    else if ((game[0]==game[3]) && (game[3]==game[6]) && (game[0] != "A")){
                        winner[0]=true;
                        vr1.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[1]==game[4]) && (game[4]==game[7]) && (game[1] != "A")){
                        winner[0]=true;
                        vr2.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[2]==game[5]) && (game[5]==game[8]) && (game[2] != "A")){
                        winner[0]=true;
                        vr3.setImageDrawable(getResources().getDrawable(R.drawable.line_verticle));
                    }
                    else if ((game[0]==game[4]) && (game[4]==game[8]) && (game[0] != "A")){
                        winner[0]=true;
                        tan1.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else if ((game[2]==game[4]) && (game[4]==game[6]) && (game[2] != "A")){
                        winner[0]=true;
                        tan2.setImageDrawable(getResources().getDrawable(R.drawable.line_tangent));
                    }
                    else{
                        winner[0]=false;
                    }
                    if (winner[0]==true){
                        wp.start();
                        display.setText(player_winner);
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    if (player[0]==8 && winner[0]==false){
                        winner[1]=true;
                        display.setText("Tie!!!\nPlay Again");
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                    }
                    else{
                        player[0]++;
                    }
                }
                else{
                    Toast.makeText(MainActivity.this, "Slot taken! Click Another...", Toast.LENGTH_SHORT).show();
                }
            }
        });
        //-------------------box0-----------------//
        restart_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
                startActivity(getIntent());
                overridePendingTransition(0, 0);
                String time = System.currentTimeMillis() + "";
            }
        });
    }
}