<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Partner;
use App\Models\PartnersProduct;
use App\Models\Command;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

class Allgoods_Controller extends Controller
{

    //images section 

    public function imagesDisplay($imageName) {
        $imagePath = storage_path('app\public\images' . DIRECTORY_SEPARATOR . $imageName . '.png');
        
        if (!file_exists($imagePath)) {
            abort(404);
        }
        
        $fileContents = file_get_contents($imagePath);
        
        return new Response($fileContents, 200, [
            'Content-Type' => 'image/png', // Adjust the content type based on your image format
        ]);
    }

    // Customer Section

    public function sendDataC(Request $request)
    {
        $customers = Customer::all();

        return response()->json($customers);
    }

    public function suspendCustomer($customer_id)
{
    $customer = Customer::find($customer_id);
    if (!$customer) {
        return response()->json(['error' => 'Customer not found'], 404);
    }

    $customer->suspended = true;
    $customer->save();

    return response()->json(['message' => 'Customer suspended successfully'], 200);
}

public function unsuspendCustomer($customer_id)
{
    $customer = Customer::find($customer_id);
    if (!$customer) {
        return response()->json(['error' => 'Customer not found'], 404);
    }

    $customer->suspended = false;
    $customer->save();

    return response()->json(['message' => 'Customer unsuspended successfully'], 200);
}

    public function DestroyC($customer_id)
    {
        $customer = Customer::find($customer_id); 
        dd($customer);

        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }

        $customer->delete();

        return response()->json(['message' => 'Customer deleted successfully']);
    }


    // Partner Section
    
    public function sendDataP(Request $request)
    {
        $partners = Partner::all();

        return response()->json($partners);
    }

    public function suspendPartner($partner_id)
    {
        $partner = Partner::find($partner_id);
        if (!$partner) {
            return response()->json(['error' => 'Partner not found'], 404);
        }
    
        $partner->suspended = true;
        $partner->save();
    
        return response()->json(['message' => 'Partner suspended successfully'], 200);
    }
    
    public function unsuspendPartner($partner_id)
    {
        $partner = Partner::find($partner_id);
        if (!$partner) {
            return response()->json(['error' => 'Partner not found'], 404);
        }
    
        $partner->suspended = false;
        $partner->save();
    
        return response()->json(['message' => 'Partner unsuspended successfully'], 200);
    }

    public function DestroyP($partner)
    {
        $partner = Partner::find($partner); 
        dd($partner);

        if (!$partner) {
            return response()->json(['error' => 'partner not found'], 404);
        }

        $partner->delete();

        return response()->json(['message' => 'partner deleted successfully']);
    }


     // Product Section
    
     public function sendDataPr(Request $request)
     {
         $products = PartnersProduct::all();
 
         return response()->json($products);
     }
 
     public function showPr($product)
     {
         $data = PartnersProduct::find($product); 
 
         if (!$data) {
             return response()->json(['error' => 'product not found'], 404);
         }
 
         return response()->json($data);
     }
 
     public function EditPr(Request $request, $product)
     {
         $product = PartnersProduct::find($product);
 
         if (!$product) {
             return response()->json(['error' => 'product not found'], 404);
         }
 
         $product->name = $request->input('name');
         $product->save();
 
         return response()->json($product);
     }
 
     public function DestroyPr($product)
     {
         $product = PartnersProduct::find($product); 
         dd($product);
 
         if (!$product) {
             return response()->json(['error' => 'product not found'], 404);
         }
 
         $product->delete();
 
         return response()->json(['message' => 'product deleted successfully']);
     }


     // Command Section
    
     public function sendDataCm(Request $request)
     {
         $commands = Command::all();
 
         return response()->json($commands);
     }
 
     public function showCm($command)
     {
         $data = Command::find($command); 
 
         if (!$data) {
             return response()->json(['error' => 'command not found'], 404);
         }
 
         return response()->json($data);
     }
 
     public function EditCm(Request $request, $command)
     {
         $command = Command::find($command);
 
         if (!$command) {
             return response()->json(['error' => 'command not found'], 404);
         }
 
         $command->name = $request->input('name');
         $command->save();
 
         return response()->json($command);
     }
     public function updateCm(Request $request, $command)
    {
        $command = Command::find($command); 
        
        $validatedData = $request->validate([
            'status' => 'required|in:pending,completed,canceled',
        ]);

        $command->update($validatedData);

        return response()->json(['message' => 'Command status updated successfully']);
    }
 
     public function DestroyCm($command)
     {
         $command = Command::find($command); 
         dd($command);
 
         if (!$command) {
             return response()->json(['error' => 'product not found'], 404);
         }
 
         $command->delete();
 
         return response()->json(['message' => 'product deleted successfully']);
     }
}

