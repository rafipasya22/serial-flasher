void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}


void loop() {
  Serial.println("Halo");
  delay(1000);
}
