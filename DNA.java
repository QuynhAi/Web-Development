// Ai Quynh Nguyen
// 11/20/2017
// CSE142
// TA:Daniel Sullivan
// Assisgnment #7
//
// This program process data for genome file with two given input files
// Read each individual sequence and counts the occurrences of each nucleotides
// Computes the mass percentage occupied by each nucleotide type
// Report the codons(trios of nucleotides) in each sequence
// Check whether if the sequence is a protein
import java.io.*;
import java.util.*;

public class DNA {
   
   // Declaring all the constants
   static final int minCodons = 5;
   
   static final int massPercentage = 30;
   static final int uniqueNucleotides = 4;
   static final int nucleotidesPerCodon = 3;
   
   public static void main(String [] args) throws FileNotFoundException{
      
      double[] nucleotideMass = {135.128, 111.103, 151.128, 125.107};
      double[] individualMass = new double [uniqueNucleotides];
      
      Scanner console = new Scanner (System.in);
      
      // Introduction
      System.out.println("This program reports information about DNA");
      System.out.println("nucleotide sequences that may encode proteins. ");
      
      // Accept the text that user type in
      File theInputFile = inputName(console);
      
      // Accept the file name for output
      // Use printStream to create an output file text
      File theOutputFile = outputFile(console);
      PrintStream output = new PrintStream(theOutputFile);
      
      // Use scanner to scan each line from the input file
      Scanner input = new Scanner(theInputFile);
      while (input.hasNextLine()){
         
         // First line is the region name
         String regionName = input.nextLine();
         output.println("Region Name: " + regionName);
         
         // Second line is the sequences
         String sequences = input.nextLine();
         
         // Change all the sequencs to upper case
         String updatedSequences = sequences.toUpperCase();
         output.println("Nucleotides: " + updatedSequences);
         
         // get the total count for each nucleotides and print them
         int [] nucleotidesCounts = countNucleotides(updatedSequences);
         output.println("Nuc. Counts: " + Arrays.toString(nucleotidesCounts));
         
         // get the total of '-' or junk inside each sequence
         double junkCounts = junkInfo(updatedSequences);
         
         // get the total masses in each sequence
         double theTotalMasses = totalMasses(nucleotidesCounts, nucleotideMass,
         updatedSequences, junkCounts);
         
         // get total individual mass for each nucleotide
         double[] singularMass = singularMass(nucleotidesCounts, nucleotideMass,
         individualMass, theTotalMasses);
         
         output.print("Total Mass%: " + Arrays.toString(singularMass));
         output.println(" of " + theTotalMasses);
         
         // print out the list of codons by 3
         String[] codons = codonsInfo(updatedSequences, nucleotidesPerCodon);
         if (codons.length == 0){
            output.println("INVALID INPUT DNA! ");
            output.println("Is Protein?: UNKNOWN");
            
         }else {
            output.println("Codons List: " + Arrays.toString(codons));
            // check if the sequence is a protein or not
            String isProtein = protein(codons, singularMass);
            output.println("Is Protein?: " + isProtein);
         }
         output.println();
      }
   }
   
   // A string method that takes string array codons and double array singularMass as parameters
   // In order to be a protein, have to match 3 conditions
   // Needs to start with ATG and length have to be longer than 5
   // Needs to end with TAA or TAG or TGA
   // return Yes for protein and no for not protein
   public static String protein(String[] codons, double[] singularMass){
      if(codons[0].startsWith("ATG")){
         if(codons.length >= minCodons
         && (singularMass[1] + singularMass[2])>= massPercentage){
            if(codons[codons.length - 1].endsWith("TAA")
            || codons[codons.length - 1].endsWith("TAG")
            || codons[codons.length - 1].endsWith("TGA")){
               return "YES";
            }
         }
      }
      return "NO";
   }
   
   
   // Method is a integer array that takes in seqences as a parameter
   // Count how many times each individual nucleotide appear in the sequence
   // Then return those counts
   public static int[] countNucleotides(String updatedSequences){
      
      char[] nucleotides = {'A', 'C', 'G', 'T'};
      int[] nucleotidesCounts = new int[uniqueNucleotides];
      for (int i = 0; i < updatedSequences.length(); i++){
         for (int j = 0; j < nucleotides.length; j++){
            if (updatedSequences.charAt(i) == nucleotides[j]){
               nucleotidesCounts[j]++;
            }
         }
      }
      return nucleotidesCounts;
   }
   
   
   // A double method that takes int array nucleotidesCount, double array nucleotideMass
   // string updatedSequences and double junkCounts as parameter
   // Calculate the totalMasses by multiple counts # in nucleotides with its mass
   // then return those values
   public static double totalMasses (int[] nucleotidesCounts,double[] nucleotideMass,
   String updatedSequences, double junkCounts){
      double totalMasses = junkCounts;
      for (int i = 0; i < nucleotidesCounts.length; i++){
         totalMasses += nucleotidesCounts[i] * nucleotideMass[i];  
      }
      totalMasses = Math.round(totalMasses * 10.0) / 10.0;
      return totalMasses;
   }
   
   // a double array that take int array nucleotidesCounts, double array nucleotideMass
   // double array individualMass, and double totalMasses as parameter
   // Take each box of nucleotidesCounts multiple by each box of nucleotidesMass
   // Then divide by totalMasses
   // Store those values into each box of the individualMass and return those values
   public static double[] singularMass( int[]nucleotidesCounts, double[] nucleotideMass,
   double[] individualMass, double totalMasses){
      
      for (int i = 0; i < nucleotidesCounts.length; i++){
         double massTotal = (nucleotidesCounts[i] * nucleotideMass[i] / totalMasses);
         double a = Math.round(massTotal* 1000.00);
         individualMass[i] = a / 10.0;
      }
      return individualMass;
   }
   
   
   // A string method that takes updatedSequences and nucleotidesPerCondon as parameter
   // Replace all of the '-' and create a new codonsList
   // that match with the number of sequences length divide by 3(nucleotidesPerCodon
   // Store 3 characters inside each box of the CodonsList
   public static String [] codonsInfo (String updatedSequences,int nucleotidesPerCodon){
      
      String characters = "";
      int place = 0;
      String newSequences = updatedSequences.replaceAll("-", "");
      
      if(newSequences.length() % nucleotidesPerCodon != 0){
         String[] invalidCodons = new String[0];
         return invalidCodons;
      }
      
      String[] codonsList = new String[newSequences.length() / nucleotidesPerCodon];
      
      for(int i = 0; i < newSequences.length(); i++){
         characters += newSequences.charAt(i);
         if (characters.length() == nucleotidesPerCodon){
            codonsList[place] = characters;
            characters = "";
            place++;
         }
      }
      return codonsList;
   }
   
   // Method of double junkInfo that takes updatedSequences as parameter
   // Use for loop to check if the '-' appear in the sequence
   // Get the total amount of '-' and multiple by 100
   // Then return the total of the junk
   public static double junkInfo (String updatedSequences){
      double junkTotal = 0.0;
      int junkCounts = 0;
      for (int i = 0; i < updatedSequences.length(); i++){
         if (updatedSequences.charAt(i) == '-'){
            junkCounts++ ;
         }
         junkTotal = junkCounts * 100.0;
      }
      return junkTotal;
   }
   
   // Scanner console as parameter
   // Create new file from the name that user typed in
   // Return the file
   public static File inputName (Scanner console) {
      System.out.print("Input file name? ");
      String inputName = console.nextLine();
      File fileName = new File(inputName);
      
      return fileName;
   }
   
   // Scanner console as parameter
   // Create new file from the name that user typed in
   // Return the file
   public static File outputFile(Scanner console) {
      System.out.print("Output file name? ");
      String outputName = console.nextLine();
      File fileName = new File(outputName);
      
      return fileName;
   }
}