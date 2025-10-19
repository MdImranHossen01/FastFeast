import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

// API রুট তৈরি
export async function GET(req, { params }) {
  const { id } = params;

  try {
    // অর্ডারের ডাটা (আপনি এখানে ডাটাবেস বা অন্য উৎস থেকে অর্ডারের তথ্য আনতে পারেন)
    const order = await getOrderDetailsById(id); // আপনাকে এই ফাংশনটি তৈরি করতে হবে।

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // নতুন PDF ডকুমেন্ট তৈরি করা হচ্ছে
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); // পৃষ্ঠার আকার (আপনি এখানে পছন্দমত পরিবর্তন করতে পারেন)
    const { width, height } = page.getSize();
    
    // Standard Helvetica ফন্ট এম্বেড করা
    const helveticaFont = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);

    // টেক্সট সাজানো হচ্ছে
    page.drawText(`Order Invoice`, { x: 50, y: height - 50, size: 20, font: helveticaFont });
    page.drawText(`Order ID: ${order.id}`, { x: 50, y: height - 100, size: 12, font: helveticaFont });
    page.drawText(`Customer: ${order.customerName}`, { x: 50, y: height - 130, size: 12, font: helveticaFont });
    page.drawText(`Total: ৳${order.total}`, { x: 50, y: height - 160, size: 12, font: helveticaFont });
    page.drawText(`Items:`, { x: 50, y: height - 190, size: 12, font: helveticaFont });

    order.items.forEach((item, index) => {
      const yPosition = height - (210 + (index * 30)); // আইটেম গুলোর পজিশন অ্যাডজাস্ট করা
      page.drawText(`${item.name} - ৳${item.price} x ${item.quantity}`, { x: 50, y: yPosition, size: 12, font: helveticaFont });
    });

    // পিডিএফ ডকুমেন্ট তৈরি এবং ব্লব বানানো
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // PDF ডাউনলোডের জন্য রেসপন্স ফিরিয়ে দেয়া
    return new NextResponse(pdfBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=invoice-${id}.pdf`
      }
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 });
  }
}

async function getOrderDetailsById(id) {
  return {
    id: id,
    customerName: 'John Doe',
    total: 500,
    items: [
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 300, quantity: 1 },
    ]
  };
}
