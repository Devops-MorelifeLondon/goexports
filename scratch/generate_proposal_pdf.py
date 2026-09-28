import os
import subprocess
import pymupdf

def create_page5_html():
    features = [
        ("Monthly Qualified Leads", True, True, True),
        ("Public Storefront", True, True, True),
        ("Product Catalog Listing", True, True, True),
        ("Targeted Industry Leads", True, True, True),
        ("International Buyers", True, True, True),
        ("Dedicated Account Manager", True, True, True),
        ("Free Website", True, True, True),
        ("Free Hosting", True, True, True),
        ("Featured Ads", True, True, True),
        ("Social Media Account Management", False, True, True),
        ("SEO", False, True, True),
        ("Shipping & Global Support", False, True, True),
        ("Verified Global Buyers", False, False, True),
        ("24/7/365 Priority Support", False, False, True),
        ("Registered Office Address", False, False, True),
        ("Banking Support", False, False, True),
        ("UK Company Formation Support", False, False, True),
        ("Amazon Global Listing", False, False, True),
        ("eBay Global Listing", False, False, True),
        ("Etsy Global Listing", False, False, True),
    ]

    chk_svg = '<div class="check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>'

    rows_html = ""
    for idx, (name, s, g, e) in enumerate(features):
        row_cls = "even-row" if idx % 2 == 0 else "odd-row"
        rows_html += f"""
          <tr class="{row_cls}">
            <td class="feature-name">{name}</td>
            <td class="check-cell">{chk_svg if s else ''}</td>
            <td class="check-cell growth-col">{chk_svg if g else ''}</td>
            <td class="check-cell">{chk_svg if e else ''}</td>
          </tr>"""

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  
  * {{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }}
  
  @page {{
    size: 2145px 1432.5px;
    margin: 0;
  }}
  
  body {{
    width: 2145px;
    height: 1432.5px;
    background-color: #FAF9F6;
    color: #0F172A;
    overflow: hidden;
    position: relative;
  }}
  
  /* Top Banner */
  .top-banner {{
    background-color: #0B0F17;
    height: 180px;
    width: 100%;
    padding: 35px 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }}
  
  .section-tag {{
    color: #E5A84B;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }}
  
  .page-title {{
    color: #FFFFFF;
    font-size: 44px;
    font-weight: 700;
    letter-spacing: -1px;
    line-height: 1.1;
  }}
  
  /* Main Container */
  .main-container {{
    padding: 24px 80px 20px 80px;
    display: flex;
    flex-direction: column;
    height: calc(1432.5px - 180px - 50px);
  }}
  
  /* Top Cards Row */
  .header-grid {{
    display: grid;
    grid-template-columns: 29% 23.66% 23.66% 23.66%;
    gap: 16px;
    margin-bottom: 12px;
    align-items: stretch;
  }}
  
  .title-card {{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 20px 10px 10px;
  }}
  
  .title-tag {{
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #64748B;
    text-transform: uppercase;
    margin-bottom: 4px;
  }}
  
  .title-heading {{
    font-size: 36px;
    font-weight: 800;
    color: #0F172A;
    letter-spacing: -1px;
    line-height: 1.15;
    margin-bottom: 8px;
  }}
  
  .title-desc {{
    font-size: 16.5px;
    color: #64748B;
    line-height: 1.4;
  }}
  
  .plan-card {{
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 16px;
    padding: 14px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
    position: relative;
  }}
  
  .plan-card.growth {{
    border: 2.5px solid #E5A84B;
    box-shadow: 0 8px 24px rgba(229, 168, 75, 0.16);
  }}
  
  .popular-badge {{
    position: absolute;
    top: -11px;
    background: #E5A84B;
    color: #0F172A;
    font-size: 11.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 2px 12px;
    border-radius: 20px;
  }}
  
  .plan-name {{
    font-size: 24px;
    font-weight: 800;
    color: #0F172A;
    margin-top: 2px;
  }}
  
  .plan-price {{
    color: #DE9A30;
    font-size: 27px;
    font-weight: 800;
    margin: 3px 0 6px 0;
    letter-spacing: -0.5px;
  }}
  
  .plan-price span {{
    font-size: 16px;
    font-weight: 600;
    color: #94A3B8;
  }}
  
  /* Sized up leads badge */
  .leads-badge {{
    background: #F1F5F9;
    color: #0F172A;
    font-size: 17px;
    font-weight: 800;
    padding: 4px 16px;
    border-radius: 20px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    border: 1px solid #E2E8F0;
  }}
  
  .plan-card.growth .leads-badge {{
    background: rgba(26, 58, 58, 0.1);
    color: #1A3A3A;
    border: 1px solid rgba(26, 58, 58, 0.2);
  }}
  
  .leads-badge .count {{
    font-size: 19px;
    font-weight: 800;
  }}
  
  .cta-btn {{
    width: 100%;
    background: #0F172A;
    color: #FFFFFF;
    font-size: 15.5px;
    font-weight: 700;
    padding: 9px 0;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    letter-spacing: 0.3px;
  }}
  
  .plan-card.growth .cta-btn {{
    background: #1A3A3A;
  }}
  
  /* Table Styles */
  .table-wrap {{
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
    flex: 1;
    display: flex;
    flex-direction: column;
  }}
  
  table {{
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    height: 100%;
  }}
  
  colgroup col:nth-child(1) {{ width: 29%; }}
  colgroup col:nth-child(2) {{ width: 23.66%; }}
  colgroup col:nth-child(3) {{ width: 23.66%; }}
  colgroup col:nth-child(4) {{ width: 23.66%; }}
  
  tr {{
    border-bottom: 1px solid #F1F5F9;
  }}
  
  tr:last-child {{
    border-bottom: none;
  }}
  
  tr.even-row {{
    background-color: #FFFFFF;
  }}
  
  tr.odd-row {{
    background-color: #F8FAFC;
  }}
  
  td.feature-name {{
    padding: 0 24px;
    font-size: 16px;
    font-weight: 600;
    color: #1E293B;
    border-right: 1.5px solid #F1F5F9;
    text-align: left;
    height: 42px;
  }}
  
  td.check-cell {{
    text-align: center;
    vertical-align: middle;
    border-right: 1.5px solid #F1F5F9;
    height: 42px;
  }}
  
  td.check-cell:last-child {{
    border-right: none;
  }}
  
  td.growth-col {{
    background-color: rgba(229, 168, 75, 0.025);
  }}
  
  .check-icon {{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #1E293B;
  }}
  
  .check-icon svg {{
    width: 22px;
    height: 22px;
    stroke: #0F172A;
    stroke-width: 3;
  }}
  
  /* Footer */
  .footer {{
    position: absolute;
    bottom: 14px;
    right: 80px;
    font-size: 15px;
    font-weight: 600;
    color: #94A3B8;
    display: flex;
    align-items: center;
    gap: 8px;
  }}
  
  .footer .page-num {{
    color: #10B981;
    font-weight: 700;
  }}
</style>
</head>
<body>

  <!-- Top Dark Header Banner -->
  <div class="top-banner">
    <div class="section-tag">SECTION 3</div>
    <div class="page-title">Plan Comparison</div>
  </div>

  <!-- Main Slide Content Area -->
  <div class="main-container">
    
    <!-- Top 4 Header Cards -->
    <div class="header-grid">
      <!-- Left Column Title Box -->
      <div class="title-card">
        <div class="title-tag">FEATURES &amp; PLANS</div>
        <div class="title-heading">Plan Comparison</div>
        <div class="title-desc">Compare benefits &amp; verified buyer leads across packages.</div>
      </div>

      <!-- Starter Card -->
      <div class="plan-card">
        <div class="plan-name">Starter</div>
        <div class="plan-price">£249<span>/month</span></div>
        <div class="leads-badge">
          <span class="count">30</span> Leads / mo
        </div>
        <div class="cta-btn">Choose Plan</div>
      </div>

      <!-- Growth Card (Popular) -->
      <div class="plan-card growth">
        <div class="popular-badge">⭐ Most Popular</div>
        <div class="plan-name">Growth</div>
        <div class="plan-price">£499<span>/month</span></div>
        <div class="leads-badge">
          <span class="count">60</span> Leads / mo
        </div>
        <div class="cta-btn">Choose Plan</div>
      </div>

      <!-- Enterprise Card -->
      <div class="plan-card">
        <div class="plan-name">Enterprise</div>
        <div class="plan-price">£999<span>/month</span></div>
        <div class="leads-badge">
          <span class="count">120</span> Leads / mo
        </div>
        <div class="cta-btn">Choose Plan</div>
      </div>
    </div>

    <!-- Features Comparison Table -->
    <div class="table-wrap">
      <table>
        <colgroup>
          <col>
          <col>
          <col>
          <col>
        </colgroup>
        <tbody>
          {rows_html}
        </tbody>
      </table>
    </div>

  </div>

  <!-- Footer Branding -->
  <div class="footer">
    GoExports | Leads Proposal | <span class="page-num">05</span>
  </div>

</body>
</html>"""

    os.makedirs("scratch", exist_ok=True)
    html_path = os.path.abspath("scratch/page_5_redesign.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    return html_path

def render_html_to_pdf(html_path, output_pdf_path):
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--print-to-pdf-no-header",
        f"--print-to-pdf={output_pdf_path}",
        html_path
    ]
    subprocess.run(cmd, check=True)
    print("Rendered Page 5 to PDF:", output_pdf_path)

def update_master_pdf():
    html_path = create_page5_html()
    rendered_single_pdf = os.path.abspath("scratch/page_5_single.pdf")
    render_html_to_pdf(html_path, rendered_single_pdf)

    # Open single page pdf and master pdf
    single_doc = pymupdf.open(rendered_single_pdf)
    single_page = single_doc[0]

    master_pdf_path = "public/proposal/Goexports Global PDF Proposal 2026.pdf"
    master_doc = pymupdf.open(master_pdf_path)

    # Master page 5 target rect
    target_rect = master_doc[4].rect # Rect(0.0, 0.0, 2145.0, 1432.5)
    print("Master page 5 rect:", target_rect)
    print("Single page rect:", single_page.rect)

    # Replace page 5 in master doc: delete old page 5, insert new page at index 4
    master_doc.delete_page(4)
    # Insert new page with exact target rect
    new_page = master_doc.new_page(pno=4, width=target_rect.width, height=target_rect.height)
    new_page.show_pdf_page(new_page.rect, single_doc, 0)

    # Save updated master pdf
    temp_output = "scratch/Goexports_Global_PDF_Proposal_2026_updated.pdf"
    master_doc.save(temp_output)
    master_doc.close()
    single_doc.close()

    # Overwrite the master PDF
    import shutil
    shutil.copyfile(temp_output, master_pdf_path)
    print("Successfully updated master PDF:", master_pdf_path)

if __name__ == "__main__":
    update_master_pdf()
