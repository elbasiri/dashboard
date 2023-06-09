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
use Illuminate\Support\Facades\DB;

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

        if (!$partner) {
            return response()->json(['error' => 'partner not found'], 404);
        }

        $partner->delete();

        return response()->json(['message' => 'partner deleted successfully']);
    }


     // Product Section
    
     public function sendDataPr(Request $request)
{
    $products = DB::table('partners_products')
        ->join('partners', 'partners_products.partner_id', '=', 'partners.partner_id')
        ->join('categories', 'partners_products.category_id', '=', 'categories.category_id')
        ->select('partners_products.*', 'partners.username as partner_name', 'categories.name as category_name')
        ->get();

    return response()->json($products);
}

public function suspendProduct($product_id)
{
    $product = PartnersProduct::find($product_id);
    if (!$product) {
        return response()->json(['error' => 'product not found'], 404);
    }

    $product->suspended = true;
    $product->save();

    return response()->json(['message' => 'Product suspended successfully'], 200);
}

public function unsuspendProduct($product_id)
{
    $product = PartnersProduct::find($product_id);
    if (!$product) {
        return response()->json(['error' => 'Product not found'], 404);
    }

    $product->suspended = false;
    $product->save();

    return response()->json(['message' => 'Product unsuspended successfully'], 200);
}



 
     public function DestroyPr($product)
     {
         $product = PartnersProduct::find($product); 
 
         if (!$product) {
             return response()->json(['error' => 'product not found'], 404);
         }
 
         $product->delete();
 
         return response()->json(['message' => 'product deleted successfully']);
     }


     // Command Section
    
     public function sendDataCm(Request $request)
     {
        $commands = DB::table('commands')
        ->join('partners', 'commands.partner_id', '=', 'partners.partner_id')
        ->join('customers', 'commands.customer_id', '=', 'customers.customer_id')
        ->join('partners_products', 'commands.product_id', '=', 'partners_products.product_id')
        ->select('commands.*', 'partners.username as partner_name', 'customers.username as customer_name','partners_products.name as product_name')
        ->get();

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

