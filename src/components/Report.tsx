"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#fefce8", 
    color: "#1f2937", 
  },
  section: {
    marginBottom: 20,
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    border: "1px solid #fde68a", 
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#ea580c", // orange
    borderBottom: "1px solid #fcd34d",
    paddingBottom: 4,
  },
  label: {
    fontWeight: "bold",
    color: "#0f172a",
  },
  textItem: {
    marginBottom: 6,
    lineHeight: 1.5,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#15803d", 
    marginTop: 10,
  },
  suggestion: {
    marginBottom: 4,
    paddingLeft: 10,
    color: "#7c3aed", 
    fontSize: 11,
  },
});

export const PDFReport = ({
  data,
}: {
  data: {
    materialCost: number;
    laborCost: number;
    overhead: number;
    total: number;
    suggestions: string[];
    area: string;
    material: string;
    laborHours: string;
  };
}) => {
  if (!data || typeof data !== "object") return null;
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.heading}>Construction Cost Estimation Report</Text>
              <Text style={styles.textItem}>
                <Text style={styles.label}>Area:</Text> {data.area} sq ft
              </Text>
              <Text style={styles.textItem}>
                <Text style={styles.label}>Material Type:</Text> {data.material}
              </Text>
              <Text style={styles.textItem}>
                <Text style={styles.label}>Labor Hours:</Text> {data.laborHours}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Cost Breakdown</Text>
              <Text style={styles.textItem}>
                <Text style={styles.label}>Material Cost:</Text> ₹{data.materialCost.toLocaleString()}
              </Text>
              <Text style={styles.textItem}>
                <Text style={styles.label}>Labor Cost:</Text> ₹{data.laborCost.toLocaleString()}
              </Text>
              <Text style={styles.textItem}>
                <Text style={styles.label}>Overhead:</Text> ₹{data.overhead.toLocaleString()}
              </Text>
              <Text style={styles.totalText}>
                Total Estimated Cost: ₹{data.total.toLocaleString()}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Suggestions</Text>
              {data.suggestions.length > 0 ? (
                data.suggestions.map((s, i) => (
                  <Text key={i} style={styles.suggestion}>• {s}</Text>
                ))
              ) : (
                <Text style={{ color: "#16a34a" }}>Your estimate is already optimized!</Text>
              )}
            </View>
          </Page>
        </Document>
      }
      fileName="cost-estimate-report.pdf"
      className="mt-6 inline-block rounded bg-orange-500 px-5 py-2 text-white font-semibold shadow hover:bg-orange-600 transition-all"
    >
      {({ loading }) => (loading ? "Generating PDF..." : "Download PDF Report")}
    </PDFDownloadLink>
  );
};
